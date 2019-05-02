import { Component, OnInit, ViewChild } from '@angular/core';
import * as FaceDetector from 'facedetector';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.css']
})
export class FaceDetectorComponent implements OnInit {

  @ViewChild('video')
  public video;
  @ViewChild('canvas')
  public canvas;


  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    var VIEW_WIDTH = 320;
    var VIEW_HEIGHT = 240;
    var canvas= <HTMLCanvasElement>document.getElementById("canvas");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      });
    }

    var videoTag=document.getElementById("video");
    var faceDetector = new FaceDetector({
              video: videoTag,
              flipLeftRight: false,
              flipUpsideDown: false
    });

    let ctx = this.canvas.nativeElement.getContext('2d');
    faceDetector.setOnFaceAddedCallback(this.takePicture(ctx, this.video));

    faceDetector.setOnFaceLostCallback(function (lostFaces, detectedFaces) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  });
  
    faceDetector.setOnFaceUpdatedCallback(function (detectedFaces) {
      var ctx = (<any>canvas).getContext("2d");
      ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.fillStyle = "red";
      ctx.font = "italic small-caps bold 20px arial";

      for (var i = 0; i < detectedFaces.length; i++) {

          var face = detectedFaces[i];

          ctx.fillText(face.faceId, face.x * VIEW_WIDTH, face.y * VIEW_HEIGHT);
          ctx.strokeRect(face.x * VIEW_WIDTH, face.y * VIEW_HEIGHT + 10, face.width * VIEW_WIDTH, face.height * VIEW_HEIGHT);

      }
    });
  
    //after getUserMedia
    faceDetector.startDetecting();
  }

  //Take a picture, send it to face API - identify the result and send a post to our api to mark the user as present if he's recognized
  takePicture(ctx, video){
     ctx = this.canvas.nativeElement.getContext('2d');
     return ()=>{
      ctx.drawImage(video.nativeElement, 0, 0, this.video.nativeElement.width, this.video.nativeElement.height);
      this.canvas.nativeElement.toBlob((result)=>{
        let headers = new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key' : ''/*Insert your face API key here*/
        });
        this.httpClient.post<any>('https://francecentral.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false', result, {headers}).subscribe(res =>{
          let params = {
            "personGroupId": "1",
            "faceIds": [
                res[0].faceId
            ],
            "maxNumOfCandidatesReturned": 1,
            "confidenceThreshold": 0.5
          };

          headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : ''
          });
          this.httpClient.post<any>('https://francecentral.api.cognitive.microsoft.com/face/v1.0/identify', params, {headers}).subscribe(res2=>{
            let faceId = res2[0].candidates[0].personId;
            console.log(faceId);
            headers = new HttpHeaders({
              'Content-Type': 'application/json',
            });
            // Insert api call to mark user as present
          });
        });
      });
     }
  }

}
