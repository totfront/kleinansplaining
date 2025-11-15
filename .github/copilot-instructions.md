General

- Use clear and descriptive variable names.
- Keep functions small and focused on a single task.
- Avoid "else" and "if else" statements when possible; prefer early returns.

Markup (M)

1. Use semantic HTML5 elements wherever possible.
2. Avoid using divs unless absolutely necessary.
3. Avoid inline styles;
4. If it can be done with CSS, do it with CSS.
5. If it can be done with HTML, do it with HTML - do not use additional wrappers for styling.
6. Absolutely avoid using tables for layout purposes until it is not a semantic table.
7. Absolutely avoid using non-accessible elements or practices. Always prioritize accessibility.
8. Avoid using z-index more than 5 unless necessary for specific use cases.
9. Avoid using position: absolute, !important.

TypeScript (T)
1. Use strict typing and avoid using "any".
2. Avoid type assertions unless absolutely necessary.
3. Use format of `T${typeName}` for Type names and `I${interfaceName}` for Interface names.

React (R)
1. Use functional components and hooks instead of class components unless there's a specific need.
2. Keep components small and focused; break down large components into smaller ones.
3. Try to keep components stateless;
4. Try to keep states for every component at most 3 if not decompose into smaller components.

Rule violations
- If you violate any of the above rules, provide a brief explanation of why the violation is necessary and its code. Example: "R-2 violation: Used class component because lifecycle methods were necessary for this component: because of A, B, and C."