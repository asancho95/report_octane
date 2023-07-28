import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class MaterialModule { }
