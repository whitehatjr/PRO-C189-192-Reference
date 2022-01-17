AFRAME.registerComponent('drive', {
    init: function () {
        var gameStateValue = this.el.getAttribute("game")
        if (gameStateValue == "play") {
            this.driveCar()
        }
    },

    driveCar: function () {
        var multiply = 10;
        var wheelRotation = 0;
        window.addEventListener('keydown', function (e) {
            //Steering Wheel Rotatation
            var wheel = document.querySelector("#control-wheel")
          

            //Camera Movement Control Rotation & Direction
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);


            if (e.code == "ArrowRight" && wheelRotation > -40) {
                console.log(wheelRotation)
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })

            }
            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("velocity", cameraDirection.multiplyScalar(-10))

            }

            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                console.log(wheelRotation)
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }
            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5

                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("velocity", cameraDirection.multiplyScalar(-10))

            }

            if (e.code == "ArrowUp") {
                multiply += 0.5

                if (multiply <= 100 && cameraPosition.z > -500) {
                    cameraRig.setAttribute("velocity", cameraDirection.multiplyScalar(-multiply))
                    var accelerateCar = document.querySelector("#control-acce")
                    accelerateCar.setAttribute("material", "color", "green")
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply });
                }

            }

            if (e.code == "Space") {
                cameraRig.setAttribute("velocity", { x: 0, y: 0, z: 0 })
                var stopCar = document.querySelector("#control-break")
                stopCar.setAttribute("material", "color", "red")
            }

        })


        window.addEventListener('keyup', function (e) {

            if (e.code == "Space") {
                //Camera Movement Control Rotation & Direction
                var cameraRig = document.querySelector("#camera-rig")

                var cameraDirection = new THREE.Vector3();
                cameraRig.object3D.getWorldDirection(cameraDirection);
                cameraRig.setAttribute("velocity", cameraDirection.multiplyScalar(-10))

                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "gray")
            }

            if (e.code == "ArrowUp") {

                if (multiply > 10) {
                    multiply -= 0.5

                    //Camera Movement Control Rotation & Direction
                    var cameraRig = document.querySelector("#camera-rig")
                    var cameraDirection = new THREE.Vector3();
                    cameraRig.object3D.getWorldDirection(cameraDirection);

                    cameraRig.setAttribute("velocity", cameraDirection.multiplyScalar(-multiply))

                }
                var accelerateCar = document.querySelector("#control-acce")
                accelerateCar.setAttribute("material", "color", "gray")

            }
        })
    }


});