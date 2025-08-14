import { ConfigPlugin, withMainActivity } from 'expo/config-plugins';

const requiredImports = [
  'import android.os.Build',
  'import android.view.View',
  'import androidx.core.view.ViewCompat',
  'import androidx.core.view.WindowInsetsCompat',
];

const customInsetHandler = `
    if (Build.VERSION.SDK_INT >= 35) {
        val rootView = findViewById<View>(android.R.id.content)
        ViewCompat.setOnApplyWindowInsetsListener(rootView) { _, insets ->
          val innerPadding = insets.getInsets(WindowInsetsCompat.Type.ime())
          rootView.setPadding(
            innerPadding.left,
            innerPadding.top,
            innerPadding.right,
            innerPadding.bottom
          )
          insets
      }
    }`;

const withAndroidPlugin: ConfigPlugin = (config) => {
  return withMainActivity(config, (mod) => {
    let contents = mod.modResults.contents;

    const packageLineMatch = contents.match(/^package\s+[^\n]+\n/);
    if (packageLineMatch) {
      const packageLine = packageLineMatch[0];
      for (const imp of requiredImports) {
        if (!contents.includes(imp)) {
          contents = contents.replace(packageLine, packageLine + imp + '\n');
        }
      }
    }

    const onCreateMethodRegex =
      /override fun onCreate\(savedInstanceState: Bundle\?\) \{([\s\S]*?)^\s*}/m;

    if (
      onCreateMethodRegex.test(contents) &&
      !contents.includes('ViewCompat.setOnApplyWindowInsetsListener')
    ) {
      contents = contents.replace(onCreateMethodRegex, (match, body) => {
        const modifiedBody = body.replace(
          /super\.onCreate\(null\);?/,
          (superLine: string) => `${superLine}\n${customInsetHandler}`
        );

        return `override fun onCreate(savedInstanceState: Bundle?) {\n${modifiedBody}\n}`;
      });
    }

    mod.modResults.contents = contents;
    return mod;
  });
};

export default withAndroidPlugin;
