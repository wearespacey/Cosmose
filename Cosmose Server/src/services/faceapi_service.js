const KEY = "49c7cc03467545c0997f97b765134be4";
const axios = require('axios');
var atob = require('atob');

class FaceApiService{
    
    constructor(){
    }

    async addFace(base64Image, personGroupId, personId){
        // var data = IMAGE_FROM_AZURE.split(',')[1];
        // var mimeType = IMAGE_FROM_AZURE.split(';')[0].slice(5)
    
        // var bytes = window.atob(data);
        // var buf = new ArrayBuffer(bytes.length);
        // var byteArr = new Uint8Array(buf);
    
        // for (var i = 0; i < bytes.length; i++) {
        //     byteArr[i] = bytes.charCodeAt(i);
        // }
        // console.log(byteArr);

        // this.axiosClient = axios.create(this.binaryHeader());
        // const result = await this.axiosClient.post(`https://francecentral.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces`,);
        // console.log(result);

        return "result";
    }

    async getGroup(){
        this.axiosClient = axios.create(this.jsonHeader());
        const result = await this.axiosClient.get("https://francecentral.api.cognitive.microsoft.com/face/v1.0/persongroups/1/persons?top=1000");
        return result.data;
    }

    jsonHeader(){
        return {
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : KEY
            }
        };
    }

    binaryHeader(){
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Ocp-Apim-Subscription-Key' : KEY,
              }
        }
    }

}

module.exports.FaceApiService = FaceApiService;
module.exports.service = new FaceApiService();