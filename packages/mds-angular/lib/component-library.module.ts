import { DIRECTIVES } from './stencil-generated';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@moxiworks/mds/loader';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true
    },
  ]
})

export class ComponentLibraryModule {}