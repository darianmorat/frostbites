export const EMAIL_VERIFICATION_TEMPLATE = `
   <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
         <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Verify Your Email</h1>
      </header>
      <main style="padding: 20px;">
         <p style="font-size: 16px; margin-top: 30px">
            Thank you for signing up with <strong>FrostBites</strong>! To complete your registration, please verify your email address by clicking the button below:
         </p>
         <div style="text-align: center; margin: 30px 0;">
            <a href="{verifyURL}"
               style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Verify Email
            </a>
         </div>
         <p style="font-size: 16px;">
            This link will expire in <strong>10 minutes</strong>. If you did not sign up for a FrostBites account, you can safely ignore this email.
         </p>
      </main>
      <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
         <p style="font-size: 14px; color: #666;">Stay frosty,</p>
         <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
         <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
      </footer>
   </div>
`;

export const EMAIL_VERIFICATION_RESENT_TEMPLATE = `
   <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
         <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Verify Your Email</h1>
      </header>
      <main style="padding: 20px;">
         <p style="font-size: 16px; margin-top: 30px">
            Thank you for signing up with <strong>FrostBites</strong>! To complete your registration, please verify your email address by clicking the button below:
         </p>
         <div style="text-align: center; margin: 30px 0;">
            <a href="{verifyURL}" 
               style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Verify Email (Resent)
            </a>
         </div>
         <p style="font-size: 16px;">
            This link will expire in <strong>10 minutes</strong>. If you did not sign up for a FrostBites account, you can safely ignore this email.
         </p>
      </main>
      <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
         <p style="font-size: 14px; color: #666;">Stay frosty,</p>
         <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
         <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
      </footer>
   </div>
`;

export const RESET_PASSWORD_TEMPLATE = `
   <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
         <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Reset Your Password</h1>
      </header>
      <main style="padding: 20px;">
         <p style="font-size: 16px; margin-top: 30px"> Hi, It seems like you’ve requested to reset your password for your FrostBites account. No worries we’re here to help! <br/>
         <br/>
         Simply click the button below to reset your password:</p>
         <div style="text-align: center; margin: 30px 0;">
            <a href="{resetURL}"
               style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Reset Password
            </a>
         </div>
         <p style="font-size: 16px;">
            This link will expire in <strong>10 minutes</strong>. If you did not request for a password reset, you can safely ignore this email.
         </p>
      </main>
      <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
         <p style="font-size: 14px; color: #666;">Stay frosty,</p>
         <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
         <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
      </footer>
   </div>
`;

export const WELCOME_EMAIL_TEMPLATE = `
   <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
         <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Welcome to FrostBites</h1>
      </header>
      <main style="padding: 20px;">
         <p style="font-size: 16px; margin-top: 30px">
            Hey there, we're excited to have you join the <strong>FrostBites</strong> family. Get ready to enjoy some seriously cool treats and exclusive offers just for you.
         </p>           
         <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" 
            alt="FrostBites Logo" 
            style="border-radius: 5px; max-width: 550px; margin: 0 auto; margin-bottom: 20px; display: block;"
         >
      </main>
      <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
         <p style="font-size: 14px; color: #666;">Stay frosty,</p>
         <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
         <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
      </footer>
   </div>
`;
