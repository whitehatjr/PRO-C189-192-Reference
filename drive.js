AFRAME.registerComponent('drive', {
    init: function () {
        var gameStateValue = this.el.getAttribute("game")
        if (gameStateValue == "play") {
            this.driveCar()
        }
    },
    isVelocityActive: function () {
        console.log("hi")
        return Math.random() < 0.25;
    },

    driveCar: function () {
        var multiply = 10;
        var wheelRotation = 0;

        //Key Down Events
        window.addEventListener('keydown', function (e) {

            //Steering Wheel Rotatation  on Right & Left Arrow Keyup
            var wheel = document.querySelector("#control-wheel")

            if (e.code == "ArrowRight" && wheelRotation > -40) {                
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })

            }
            if (e.code == "ArrowLeft" && wheelRotation < 40) {                
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }
            
            //Camera Movement Control: Rotation & Direction on Right & Left Arrow Keyup
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })                
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })             
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            //Speed Up/Accelerate on Up Arrow Keyup
            if (e.code == "ArrowUp") {
                multiply += 0.5

                if (multiply <= 100 && cameraPosition.z > -500) {                  
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                    var accelerateCar = document.querySelector("#control-acce")
                    accelerateCar.setAttribute("material", "color", "green")
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply });
                }

            }
            //Stop/break on Space Keydown
            if (e.code == "Space") {            
                cameraRig.setAttribute("movement-controls", {"speed": 0})
                var stopCar = document.querySelector("#control-break")
                stopCar.setAttribute("material", "color", "red")
            }

        })

        //Key Up Events
        window.addEventListener('keyup', function (e) {
            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            if (e.code == "Space") {             
                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "gray")
            }

            if (e.code == "ArrowUp") {
                if (multiply > 10) {
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                }
                var accelerateCar = document.querySelector("#control-acce")
                accelerateCar.setAttribute("material", "color", "gray")

            }
        })
    }

});