import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { BlogImage } from "../../../features/models";
import { ImageService } from "./image.service";

@Component({
  selector: "app-image-selector",
  templateUrl: "./image-selector.component.html",
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = "";
  title: string = "";
  images$?: Observable<BlogImage[]>;
  isUnexpectedError: boolean = false;
  @ViewChild("form", { static: false }) imageUploadForm?: NgForm;

  constructor(private readonly imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length) {
      this.file = element.files[0];
    }
  }

  selectImage(image: BlogImage) {
    this.imageService.selectImage(image);
  }

  uploadImage(): void {
    if (this.file && this.fileName !== "" && this.title !== "") {
      this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (_) => {
            this.imageUploadForm?.reset();
            this.getImages();
          },
          error: _ => this.isUnexpectedError = true,
        });
    }
  }

  private getImages = (): void => {
    this.images$ = this.imageService.getImages();
  };
}
