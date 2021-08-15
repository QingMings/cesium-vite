import * as Cesium from 'cesium';
import * as CesiumSensorVolumes from 'cesium-sensor-volumes-es'
import * as CesiumGeometry from 'cesium-graph-es'
import './css/main.css';

const viewer = new Cesium.Viewer('cesiumContainer');

const blockOptions = {
    
    }

//-- debug config   
    viewer.extend(Cesium.viewerCesiumInspectorMixin);
// ----------卫星带载荷
 /*

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
         */


        /*
        var czmlFile = 'LotsOfSensors.czml';
        var dataSource = new Cesium.CzmlDataSource(czmlFile);
        dataSource.load(czmlFile);
    
        viewer.dataSources.add(dataSource);
         */


//---------------graph 库加载

var scene = viewer.scene;
    var primitives = scene.primitives;


    var colors = [
        new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
        new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1)
    ];

	for (var i = 0, len = 10; i < len; i++) {
		var startPoint = Cesium.Cartesian3.fromDegrees(Math.random() * 100, Math.random() * 100);
		var endPoint = Cesium.Cartesian3.fromDegrees(Math.random() * 100, Math.random() * 100);

		var positions = CesiumGeometry.getLinkedPointList(startPoint, endPoint, 30000, 50);

		var glowingLine = viewer.entities.add({
			polyline: {
				positions: positions,
				width: 5,
				//material: new Cesium.PolylineAttackLinkMaterialProperty({
				material: new CesiumGeometry.PolylineArrowLinkMaterialProperty({
					//color: new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1)
					color: colors[i%3],
					duration:1000
				}),
				/*material: new Cesium.PolylineDashMaterialProperty({
					color: colors[i % 3]
				})*/
			}
		});
	}