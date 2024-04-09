import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ImageSelectorComponent } from "./components/image-selector/image-selector.component";

@NgModule({
  declarations: [ImageSelectorComponent],
  imports: [CommonModule, FormsModule],
  exports: [ImageSelectorComponent],
})
export class SharedModule {}
