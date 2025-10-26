import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './Login.css'

interface LoginProps {
  onLogin: () => void
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Enter your credentials to access the Invoice Form</p>
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Store session in localStorage
            localStorage.setItem('invoiceAppSession', JSON.stringify({
              username: values.username,
              timestamp: Date.now()
            }))
            
            setTimeout(() => {
              setSubmitting(false)
              onLogin()
            }, 500)
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className={errors.username && touched.username ? 'error' : ''}
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={errors.password && touched.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login

