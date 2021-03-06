import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebSocketSupplier } from '../utils/services/webSocketSupplier/webSocketSupplier';
import { MapLayerProviderOptions } from '../../src/models/map-layer-provider-options.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdIconRegistry } from '@angular/material';
import { AppSettingsService } from './services/app-settings-service/app-settings-service';
import { ViewerFactory } from '../../src/services/viewer-factory/viewer-factory.service';
import { ViewersManagerService } from '../../src/services/viewers-service/viewers-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [WebSocketSupplier, AppSettingsService],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewInit{
  arcGisMapServerProvider = MapLayerProviderOptions.ArcGisMapServer;
  flyToOptions = {
    duration: 2,
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
  };

  constructor(public appSettingsService: AppSettingsService,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer,
              private dialog: MdDialog,
              private viewersManager: ViewersManagerService) {
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/settings.svg'));
    this.appSettingsService.showTracksLayer = true;
  }

  settingsClick(sidenav) {
    this.dialog.closeAll();
    sidenav.open();
  }

  ngAfterViewInit(): void {
    // example for getting the viewer by Id outside of the ac-map hierarchy
    const viewer = this.viewersManager.getViewer('main-map');
  }
}
