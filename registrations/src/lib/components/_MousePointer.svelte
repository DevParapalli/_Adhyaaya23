<div class="pointer js-pointer" id="js-pointer" style="left: 821px; top: 0px;">
    <div class="pointer__inner drag">drag</div>
    <i class="pointer__inner fas fa-search"></i>
</div>

<style>
.js-page-in-anim-active .pointer {
    -webkit-transform: translate(-50%, -50%) scale(0.4);
    transform: translate(-50%, -50%) scale(0.4);
}
.cursor-anim-enable .pointer {
    display: block;
}
.pointer {
    overflow: hidden;
    width: 75px;
    height: 75px;
    position: fixed;
    left: -100px;
    top: 50%;
    z-index: 9999;
    border-radius: 50%;
    pointer-events: none;
    box-sizing: border-box;
    background: #fff;
    mix-blend-mode: difference;
    -webkit-transform: translate(-50%, -50%) scale(0);
    transform: translate(-50%, -50%) scale(0);
    transition: -webkit-transform .5s cubic-bezier(.19, .94, .336, 1);
    transition: transform .5s cubic-bezier(.19, .94, .336, 1);
    transition: transform .5s cubic-bezier(.19, .94, .336, 1), -webkit-transform .5s cubic-bezier(.19, .94, .336, 1);
}
.cursor-anim-enable * {
    cursor: none !important;
}
.pointer {
    display: none;
}

div {
    display: block;
}
</style>