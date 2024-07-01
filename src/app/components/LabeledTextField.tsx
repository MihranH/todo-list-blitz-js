import { forwardRef, PropsWithoutRef } from 'react';
import { useField, useFormikContext, ErrorMessage } from 'formik';

export interface LabeledTextFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number';
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
}

export const LabeledTextField = forwardRef<
  HTMLInputElement,
  LabeledTextFieldProps
>(({ name, label, outerProps, ...props }, ref) => {
  const [input] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <div {...outerProps}>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
        <input
          {...input}
          disabled={isSubmitting}
          {...props}
          ref={ref}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </label>

      <ErrorMessage name={name}>
        {(msg) => (
          <div role='alert' style={{ color: 'red' }}>
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
});

LabeledTextField.displayName = 'LabeledTextField';

export default LabeledTextField;
