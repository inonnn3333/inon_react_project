import { useState } from 'react';

const useFormValidation = (initialFormState) => {
    const [formValues, setFormValues] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        const [mainKey, subKey] = name.split('.');

        if (subKey) {
            setFormValues((prevState) => ({
                ...prevState,
                [mainKey]: {
                    ...prevState[mainKey],
                    [subKey]: value,
                },
            }));

            // Validate field on change
            const error = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }));
        } else {
            setFormValues({ ...formValues, [name]: value });

            // Validate field on change
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleReset = () => {
        setFormValues(initialFormState);
        setErrors({});
    };

    const validateField = (name, value) => {
        let error = '';

        if (!value) {
            error = 'זהו שדה חובה';
        } else {
            const [mainKey, subKey] = name.split('.');
            const fieldName = subKey || mainKey;

            if (fieldName !== 'houseNumber' && value.length < 2) {
                error = 'לא הגיוני, קצר מידי';
            } else {
                switch (fieldName) {
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            error = 'כתובת אימייל לא תקינה';
                        }
                        break;

                    case 'password':
                        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[)!@%$#^&*_-]).{8,}$/;
                        if (!passwordRegex.test(value)) {
                            error = 'הסיסמה חייבת להכיל לפחות אות אחת גדולה, אות קטנה אחת, ארבעה מספרים, סימן מיוחד אחד מבין )!@%$#^&*-_, ולהכיל לפחות 8 תווים';
                        }
                        break;

                    case 'phone':
                        const phoneRegex = /^\d{10}$/;
                        if (!phoneRegex.test(value)) {
                            error = 'מספר פלאפון לא תקין';
                        }
                        break;

                    default:
                        const textFields = ['firstName', 'middleName', 'lastName', 'imageAlt', 'state', 'country', 'city', 'street'];
                        if (textFields.includes(fieldName) && /\d/.test(value)) {
                            error = 'נא למלא ללא מספר';
                        }
                        break;
                }
            }
        }

        return error;
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const validate = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const name = parentKey ? `${parentKey}.${key}` : key;
                const value = obj[key];

                if (typeof value === 'object' && !Array.isArray(value)) {
                    validate(value, name);
                } else {
                    const error = validateField(name, value);
                    if (error) {
                        isValid = false;
                        newErrors[name] = error;
                    }
                }
            });
        };

        validate(formValues);

        setErrors(newErrors);
        return isValid;
    };

    return {
        formValues,
        errors,
        handleChange,
        handleReset,
        validateForm,
    };
};

export default useFormValidation;
