import { CognitoUserPool } from 'amazon-cognito-identity-js';
 
// Enter details from AWS-Cognito UserPool > General Settings & App Settings
// iArt-Chicago Pool at https://us-east-2.console.aws.amazon.com/cognito/users/?region=us-east-2#/pool/us-east-2_Wamx6Uyj4/details?_k=2gxoe4
var poolData = {
    UserPoolId: 'us-east-2_Wamx6Uyj4', 
    ClientId: '2mdojf7uivcfipu0t1a005o98a', 
}

export default new CognitoUserPool(poolData)
