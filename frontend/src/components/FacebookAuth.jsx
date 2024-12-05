// import React from 'react';
// import FacebookLogin from 'react-facebook-login';

// const FacebookAuth = () => {
//   const responseFacebook = (response) => {
//     console.log("Facebook Response:", response);
    
//     if (response.token) {
//       // Send the token to your backend for verification or login logic
//       fetch("http://localhost:4000/api/auth/facebook", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: response.token }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             // Handle successful login (store JWT, navigate, etc.)
//             localStorage.setItem('authToken', data.token);
//             console.log('Login Success:', data);
//           }
//         })
//         .catch((err) => console.error("Login Error:", err));
//     }
//   };

//   return (
//     <div>
//       <h1>Facebook Login</h1>
//       <FacebookLogin
//         appId="577134531665531" // Replace with your Facebook App ID
//         autoLoad={false}
//         fields="name,email,picture"
//         callback={responseFacebook}
//         cssClass="facebook-login-button"
//         textButton="Login with Facebook"
//       />
//     </div>
//   );
// };

// export default FacebookAuth;
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookAuth = () => {
  const responseFacebook = (response) => {
    console.log("Facebook Response:", response);

    if (response.token) {
      // Send the token to your backend for verification or login logic
      fetch("http://localhost:4000/api/auth/facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Handle successful login (store JWT, navigate, etc.)
            localStorage.setItem('authToken', data.token);
            console.log('Login Success:', data);
          }
        })
        .catch((err) => console.error("Login Error:", err));
    }
  };

  const buttonStyle = {
    backgroundColor: '#1877F2', // Facebook blue color
    color: 'white',
    fontSize: '14px', // Smaller font size
    padding: '5px 10px', // Adjusted padding for a smaller button
    borderRadius: '5px',
    width: 'auto', // Allow the button to be auto-sized based on content
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    // Using !important to force the padding style
    paddingTop: '5px !important', 
    paddingBottom: '5px !important',
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
  };

  const buttonHoverStyle = {
    backgroundColor: '#165eaa', // Darker blue on hover
  };

  return (
    <div>
      
      <FacebookLogin
        appId="577134531665531" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        textButton="Login with Facebook" 
        render={(renderProps) => (
          <button
            style={buttonStyle}
            onClick={renderProps.onClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            LLOGGGIN WITH FACEBOOK {/* Custom button text */}
          </button>
        )}
      />
    </div>
  );
};

export default FacebookAuth;
