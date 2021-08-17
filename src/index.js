import * as Cesium from "cesium";
import * as CesiumSensorVolumes from "cesium-sensor-volumes-es";
import * as CesiumGeometry from "cesium-graph-es";
import {viewerCesiumNavigationMixin} from "cesium-navigation-es";
import "../node_modules/cesium-navigation-es/dist/style.css";
import "./css/main.css";
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80, 26, 150.0, 35.5);
const viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url:
      Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII") +
      "/{z}/{x}/{reverseY}.jpg",
    tilingScheme: new Cesium.GeographicTilingScheme(),
    maximumLevel: 5,
  }),
});

const blockOptions = {};

//-- debug config
viewer.extend(Cesium.viewerCesiumInspectorMixin);
viewer.extend(viewerCesiumNavigationMixin);
// ----------卫星带载荷
/* */
function example1() {
viewer.clock.startTime=Cesium.JulianDate.fromIso8601('2019-01-01T00:00:00.00Z');
viewer.clock.currentTime=Cesium.JulianDate.fromIso8601('2019-01-01T00:00:00.00Z');
var property = new Cesium.SampledPositionProperty();

    property.addSample(Cesium.JulianDate.fromIso8601('2019-01-01T00:00:00.00Z'), 
        Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0));

    property.addSample(Cesium.JulianDate.fromIso8601('2019-01-03T00:00:00.00Z'), 
        Cesium.Cartesian3.fromDegrees(-80.0, 40.0, 300000.0));

    property.addSample(Cesium.JulianDate.fromIso8601('2019-01-06T00:00:00.00Z'), 
        Cesium.Cartesian3.fromDegrees(-114.0, -40.0, 300000.0));
    property.addSample(Cesium.JulianDate.fromIso8601('2019-01-09T00:00:00.00Z'), 
        Cesium.Cartesian3.fromDegrees(-11.0, 45.0, 300000.0));
    		var position = Cesium.Cartesian3.fromDegrees(0, 0, 1000000);
		var heading = Cesium.Math.toRadians(0);
		var pitch = Cesium.Math.toRadians(90);
		var roll = Cesium.Math.toRadians(0);
		var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
		var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
		const entity = new Cesium.Entity({
			name: "Test",
            position: property,
			// position,
			orientation,
		});
		entity.addProperty("conicSensor");
		entity.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics({
			radius: 10000000,
			innerHalfAngle: Cesium.Math.toRadians(0),
			outerHalfAngle: Cesium.Math.toRadians(15),
			lateralSurfaceMaterial: Cesium.Color.GOLD.withAlpha(0.15),
			intersectionColor: Cesium.Color.GOLD.withAlpha(0.3),
			intersectionWidth: 1,
		});
		viewer.entities.add(entity);
        
  }
/*
        var czmlFile = 'LotsOfSensors.czml';
        var dataSource = new Cesium.CzmlDataSource(czmlFile);
        dataSource.load(czmlFile);
    
        viewer.dataSources.add(dataSource);
         */

//---------------graph 库加载
function example2() {
  var scene = viewer.scene;
  var primitives = scene.primitives;

  var colors = [
    new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
    new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
    new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1),
  ];

  for (var i = 0, len = 10; i < len; i++) {
    var startPoint = Cesium.Cartesian3.fromDegrees(
      Math.random() * 100,
      Math.random() * 100
    );
    var endPoint = Cesium.Cartesian3.fromDegrees(
      Math.random() * 100,
      Math.random() * 100
    );

    var positions = CesiumGeometry.getLinkedPointList(
      startPoint,
      endPoint,
      30000,
      50
    );

    var glowingLine = viewer.entities.add({
      polyline: {
        positions: positions,
        width: 5,
        //material: new Cesium.PolylineAttackLinkMaterialProperty({
        material: new CesiumGeometry.PolylineArrowLinkMaterialProperty({
          //color: new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1)
          color: colors[i % 3],
          duration: 1000,
        }),
        /*material: new Cesium.PolylineDashMaterialProperty({
					color: colors[i % 3]
				})*/
      },
    });
  }
}
// example2();
//https://github.com/AnalyticalGraphicsInc/STKComponentsExamples/blob/master/Java/CesiumDemo/src/agi/examples/cesium/CesiumDemo.java
// https://blog.csdn.net/happyduoduo1/article/details/51942862

function example3() {
var vehicle_offset_x = 45;
var vehicle_offset_y = 45;
var vehicle_offset_z = 55;

var vehicle_offset = new Cesium.Cartesian3(
  vehicle_offset_x,
  vehicle_offset_y,
  vehicle_offset_z
);
viewer.clock.startTime = Cesium.JulianDate.fromIso8601('2012-03-14T16:00:00Z');
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2012-03-14T16:00:00Z');
// var position1 = new Cesium.SampledPositionProperty(Cesium.ReferenceFrame.INERTIAL);
  //  position1.addSample( Cesium.JulianDate.fromIso8601('2012-03-14T16:00:00Z'),new Cesium.Cartesian3(16715103.6936326,11305751.9868777,-16897323.7095682));   ;
  //  position1.addSample( Cesium.JulianDate.fromIso8601('2012-03-14T16:01:00Z'),new Cesium.Cartesian3(14853647.7607362,12224294.4269584,-17986070.8677531));   ;
var position1 = Cesium.Cartesian3.fromDegrees(114,39,300000);
var heading = Cesium.Math.toRadians(0);
var pitch = Cesium.Math.toRadians(180);
var roll = Cesium.Math.toRadians(0);
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(position1, hpr);

	var o2 = new  Cesium.Quaternion(-0.5442469787907219,-0.3930414943582269,0.6791273595332279,0.29681583401707096);

// var x_rotate = Cesium.Math.toRadians(-90);
// var  left = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_X,x_rotate);
// var z_rotate = Cesium.Math.toRadians(90);
// var right = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z,z_rotate);
// var offset =new  Cesium.Quaternion();
//  offset = Cesium.Quaternion.multiply(left,right,offset);


var fixedTransform = Cesium.Transforms.eastNorthUpToFixedFrame;
var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
  position1,
  hpr,
  Cesium.Ellipsoid.WGS84,
  fixedTransform
);
var hprRollZero = new Cesium.HeadingPitchRoll();

const entity_satellite1 = new Cesium.Entity({
  id: "satellite1",
  name: "一个卫星",
  position: position1,
  orientation: orientation,
  model: {
    uri: "assets/satellite1/satellite.gltf",
    minimumPixelSize: 512,
    maximumScale: 20000,
    modelMatrix: modelMatrix,
  },
//   viewFrom: vehicle_offset,
});
entity_satellite1.addProperty('conicSensor')
entity_satellite1.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics({
	radius: 10000000,
	innerHalfAngle: Cesium.Math.toRadians(10),
	outerHalfAngle: Cesium.Math.toRadians(25),
	lateralSurfaceMaterial: Cesium.Color.GOLD.withAlpha(0.15),
	intersectionColor: Cesium.Color.GOLD.withAlpha(0.3),
	intersectionWidth: 1,
});
viewer.entities.add(entity_satellite1);
viewer.trackedEntity = entity_satellite1;

// var scene = viewer.scene;
// scene.primitives.add(
//   new Cesium.DebugModelMatrixPrimitive({
//     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
//       position1,
//       hpr,
//       Cesium.Ellipsoid.WGS84,
//       fixedTransform
//     ),
//   })
// );

}

// example3();



/**
 * 测试坐标相关
 */
function  example4() {
  let  eci_position = {
    x: 603077.8032455428,
    y: -6002455.966703592,
    z: -3599654.678304039
  };

  let  latLon_position = {
    lat: -30.966451348311743,
    lon: 161.0123004745865,
    alt: 652497.1824592045
  }

  let J_date = "2020-07-15T12:05:01Z";


}