import {NgModule} from "@angular/core";
import {TestComponent} from "./test/test.component";
import {Test2Component} from "./test/test.component copy";

@NgModule({
    declarations: [TestComponent, Test2Component],
    exports: [TestComponent, Test2Component],
})
export class MyModule { }