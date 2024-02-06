import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuBuilderComponent } from './menu-builder.component';
import { BuilderLayoutComponent } from '../_layout';


const routes: Routes = [
  {
    path: "",
    component: BuilderLayoutComponent,
    children: [
      {
        path: "",
        component: MenuBuilderComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBuilderRoutingModule { }
