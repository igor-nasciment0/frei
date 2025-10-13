import { useFormContext } from "react-hook-form";

export default function Input({ as: Component = 'input', name, children, ref, ...params }) {
  const { formState: { errors } } = useFormContext();
  const erroDoCampo = encontraErro(errors, name);

  return (
    <td className="input">
      {erroDoCampo && <span className="erro">{erroDoCampo.message}</span>}

      <Component
        {...params}
        name={name}
        ref={ref}

        // correção de problema com autoFill do navegador
        onAnimationStart={(e) => {
          if (e.animationName === 'onAutoFillStart') {
            params.onChange(e.target.value);
          }
        }}
      >
        {children}
      </Component>
    </td>
  );
};


export function encontraErro(errors, name) {
  const caminho = name.split('.');
  let erro = errors;

  for (const parte of caminho) {
    if (!erro) break;
    erro = erro[parte];
  }
  return erro;
}