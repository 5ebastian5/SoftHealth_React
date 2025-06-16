import emailjs from '@emailjs/browser';

export const sendVerificationCode = async ({ name, email, code }) => {
  const templateParams = {
    to_name: name,
    user_email: email,
    message: `Tu código de verificación es: ${code}`,
  };

  try {
    const result = await emailjs.send(
      'service_xxxxxx',      // <- tu Service ID
      'template_yyyyyy',     // <- tu Template ID
      templateParams,
      'V2ePlAbcd123xyz'      // <- tu Public Key
    );
    console.log('Correo enviado:', result.text);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error };
  }
};