import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { BlogImage } from "../../../features/models";

@Injectable({ providedIn: "root" })
export class ImageService {
  private baseUrl = environment.baseUrl;
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject({
    id: "",
    fileExtension: "",
    fileName: "",
    title: "",
    url: "",
  });

  constructor(private http: HttpClient) {}

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("title", title);

    return this.http.post<BlogImage>(`${this.baseUrl}/images`, formData);
  }

  getImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${this.baseUrl}/images`);
  }

  selectImage(image: BlogImage) {
    this.selectedImage.next(image);
  }

  onSelectedImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
