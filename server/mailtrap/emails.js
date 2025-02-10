import nodemailer from 'nodemailer';
import {
   EMAIL_VERIFICATION_RESENT_TEMPLATE,
   EMAIL_VERIFICATION_TEMPLATE,
   RESET_PASSWORD_TEMPLATE,
   WELCOME_EMAIL_TEMPLATE,
} from '../mailtrap/emailTemplates.js';

export const verificationEmail = async (verifyURL) => {
   const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
         user: process.env.MAILTRAP_USER,
         pass: process.env.MAILTRAP_PASS,
      },
   });

   const mailOptions = {
      from: `"FrostBites Team" <${process.env.MAILTRAP_EMAIL}>`,
      to: 'yojhandariantoledomora@gmail.com', // use 'email' later
      subject: 'Email Verification',
      html: EMAIL_VERIFICATION_TEMPLATE.replace('{verifyURL}', verifyURL),
   };

   try {
      await transporter.sendMail(mailOptions);
      return { success: true };
   } catch (err) {
      return { success: false };
   }
};

export const verificationResentEmail = async (verifyURL) => {
   const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
         user: process.env.MAILTRAP_USER,
         pass: process.env.MAILTRAP_PASS,
      },
   });

   const mailOptions = {
      from: `"FrostBites Team" <${process.env.MAILTRAP_EMAIL}>`,
      to: 'yojhandariantoledomora@gmail.com', // use 'email' later
      subject: 'Email Verification (Resent)',
      html: EMAIL_VERIFICATION_RESENT_TEMPLATE.replace('{verifyURL}', verifyURL),
   };

   try {
      await transporter.sendMail(mailOptions);
      return { success: true };
   } catch (err) {
      return { success: false };
   }
};

export const resetPasswordEmail = async (resetURL) => {
   const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
         user: process.env.MAILTRAP_USER,
         pass: process.env.MAILTRAP_PASS,
      },
   });

   const mailOptions = {
      from: `"FrostBites Support" <${process.env.MAILTRAP_EMAIL}>`,
      to: 'yojhandariantoledomora@gmail.com', // use 'email' later
      subject: 'Reset Your Password',
      html: RESET_PASSWORD_TEMPLATE.replace('{resetURL}', resetURL),
   };

   try {
      await transporter.sendMail(mailOptions);
      return { success: true };
   } catch (err) {
      return { success: false };
   }
};

export const welcomeEmail = async () => {
   const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
         user: process.env.MAILTRAP_USER,
         pass: process.env.MAILTRAP_PASS,
      },
   });

   const mailOptions = {
      from: `"FrostBites Team" <${process.env.MAILTRAP_EMAIL}>`,
      to: 'yojhandariantoledomora@gmail.com', // use 'email' later
      subject: 'Welcome to FROSTBITES',
      html: WELCOME_EMAIL_TEMPLATE,
   };

   try {
      await transporter.sendMail(mailOptions);
      return { success: true };
   } catch (err) {
      return { success: false };
   }
};
