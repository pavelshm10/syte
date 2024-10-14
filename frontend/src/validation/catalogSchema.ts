import * as Yup from 'yup';

export const catalogSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z]+$/, 'Name must contain only letters'),
  vertical: Yup.string()
    .oneOf(['fashion', 'home', 'general'], 'Invalid vertical')
    .required('Vertical is required'),
  primary: Yup.boolean().required('Primary is required'),
  locales: Yup.array()
    .of(Yup.string().oneOf(['en_us', 'en_ca', 'es_es'], 'Invalid locale'))
    .required('At least one locale is required'),
});
