import { useState, ReactNode, PropsWithoutRef } from 'react';
import { Formik, FormikProps } from 'formik';
import { validateZodSchema } from 'blitz';
import { z } from 'zod';
import Button from './Button';

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  onSubmit: () => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<z.infer<S>>['initialValues'];
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null);
  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (_, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit()) || {};

        if (FORM_ERROR) {
          setFormError(FORM_ERROR);
        } else {
          setFormError(null);
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors);
        }
      }}
    >
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          {...props}
        >
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && (
            <div role='alert' style={{ color: 'red', fontSize: '14px' }}>
              {formError}
            </div>
          )}

          {submitText && <Button text={submitText} />}
        </form>
      )}
    </Formik>
  );
}

export default Form;
