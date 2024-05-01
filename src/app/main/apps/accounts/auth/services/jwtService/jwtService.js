import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import { Amplify } from "aws-amplify";
import awsconfig from "../../../../../../../aws-exports";

Amplify.configure(awsconfig);

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleNewUser();
  }


  token = null;
  registerdUserCredential = null

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          this.emit("onNewUser", "Error!");
          throw err;
        });
      }
    );
  };

  handleNewUser = () => {
    this.emit('onNewUser')
  }

  // User Table Enpoints
  createTenant = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/onboarding', data).then((response) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          console.log(response)
          reject("Error in 'creating user'!")
        }
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  };

  updateMobileNumberVerificationStatus = (data) => {
    return new Promise((resolve, reject) => {
      axios.put('/auth/verificationstatus/mob/update', data).then((response) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          console.log(response)
          reject(response)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  // Cognito Authentication Endpoints

  // Generate and send Mobile Otp through SNS
  sendOtpToMobileNumber = (data, user) => {
    return new Promise((resolve, reject) => {
      axios.post('/auth/sendotp/mobile', data).then((result) => {
        if (result.status === 200) {
          this.registerdUserCredential = user
          this.token = result.data.response.otp_token
          resolve(result.data)
        } else {
          console.log(result)
          reject(result)
        }
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  };

  // Verify OTP through API Gateway and jwtToken
  verifyMobileNumberOtp = async (username, otp_answer) => {
    return new Promise((resolve, reject) => {
      axios.post('/auth/verifyotp', { otp_token: this.token, otp_answer }).then((result) => {

        if (result.status === 200) {

          if (result.data.success) {

            this.updateMobileNumberVerificationStatus({ username, newStatus: true }).then((res) => {

              if (res.success) {
                this.setSession(this.token);
                this.emit('onSignUp', this.registerdUserCredential)
                resolve(result.data.success)
              } else {
                console.log(res)
                reject(res)
              }

            }).catch((error) => {

              console.log(error)
              reject(error)

            })

          } else {

            resolve(result.data.success)

          }

        } else {
          console.log(result);
          reject(result)
        }
      }).catch((error) => {
        console.log(error);
        reject(error)
      })
    })
  };

  logout = () => {
    this.setSession(null);
  };

  // Setting Access Token
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  // Getting Access Token
  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };

}

const instance = new JwtService();

export default instance;
