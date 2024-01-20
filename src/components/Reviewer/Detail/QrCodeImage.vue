<template>
    <div>
        <h1>qrcode Image</h1>
        <img :src="qr_image" />
    </div>
</template>

<script>
export default {
    setup() {
        let qr_image = "img.png";
    }
}
</script>