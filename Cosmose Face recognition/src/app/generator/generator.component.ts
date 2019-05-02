import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  // Ma popote
  MY_KEY:string = ""; /*Insert your face API key here*/
  newName:string;
  members;
  selectedUser;
  isRecognized:boolean = false;
  recognizedUser;

  @ViewChild('video')
    public video;

    @ViewChild('canvas')
    public canvas;
    public urlPicture: string;

    public constructor(
      private httpClient: HttpClient,
      private snackbar: MatSnackBar
      ) {
    }

    public ngOnInit() {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    public ngAfterViewInit() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream;
                this.video.nativeElement.play();
            });
        }

        this.getMembers();
    }

    public getMembers(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.httpClient.get(""/*Api call to get users*/ ,{headers}).subscribe(res=>{
        this.members = res;
        console.log(res);
      });
    }

    public addUserToService(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : ''
      });
      this.httpClient.post(`https://francecentral.api.cognitive.microsoft.com/face/v1.0/persongroups/1/persons`, {name:this.newName}, {headers}).subscribe(res =>{
        console.log(res);
      });
    }

    identify(){
      const ctx = this.canvas.nativeElement.getContext('2d');
      ctx.drawImage(this.video.nativeElement, 0, 0, this.video.nativeElement.width, this.video.nativeElement.height);
      this.canvas.nativeElement.toBlob((result)=>{
        let headers = new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key' : ''
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

          if(res2[0].candidates[0].confidence > 0.70){
              this.isRecognized = true;
              this.recognizedUser = this.members.filter(m => m.personId === res2[0].candidates[0].personId)[0];
            }
          });
        });


      });
    }

    public captureAndAddFace(nbOfIteration:number) {
      let i = 0;
      while(i < nbOfIteration){
        const ctx = this.canvas.nativeElement.getContext('2d');
        ctx.drawImage(this.video.nativeElement, 0, 0, this.video.nativeElement.width, this.video.nativeElement.height);
        this.canvas.nativeElement.toBlob((result) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : ''
          });
  
          this.httpClient.post<any>(`https://francecentral.api.cognitive.microsoft.com/face/v1.0/persongroups/1/persons/${this.selectedUser.personId}/persistedFaces`, result, {headers}).subscribe(res=>{
          });
        });

        i++;
      }
     this.snackbar.open('Face registered', 'ok', {duration: 3000});
    }

    capture(){
      const ctx = this.canvas.nativeElement.getContext('2d');
        ctx.drawImage(this.video.nativeElement, 0, 0, this.video.nativeElement.width, this.video.nativeElement.height);
        this.canvas.nativeElement.toBlob((result) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : ''
          });
  
          this.httpClient.post<any>(`https://francecentral.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false`, result, {headers}).subscribe(res=>{
          console.log(res);  
        });
        });
    }

  }
