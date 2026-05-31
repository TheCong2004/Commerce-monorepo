import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals"),
	{
		rules: {
			// Fully disable all TypeScript rules
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",

			// React Hooks & dependencies
			"react-hooks/exhaustive-deps": "off",
			"react-hooks/rules-of-hooks": "off",

			// React and JSX rules
			"react/react-in-jsx-scope": "off",
			"react/no-unescaped-entities": "off",
			"react/jsx-key": "off",
			"jsx-a11y/alt-text": "off",

			// Next.js specific rules
			"@next/next/no-img-element": "off",
			"@next/next/no-page-custom-font": "off",

			// General JS/ESLint rules
			"no-unused-vars": "off",
			"no-console": "off",
			"no-script-url": "off",
			"import/no-anonymous-default-export": "off",
		},
	},
];

export default eslintConfig;
