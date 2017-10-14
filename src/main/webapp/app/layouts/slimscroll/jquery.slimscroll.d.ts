/// <reference types="jquery"/>

interface SlimScrollOptions {
    width?: string;
    height?: string;
    size?: string;
    position?: string;
    color?: string;
    alwaysVisible?: boolean;
    distance?: string;
    railVisible?: boolean;
    railColor?: string;
    railOpacity?: number;
    wheelStep?: number;
    allowPageScroll?: boolean;
    disableFadeOut?: boolean;
}

interface JQuery {
    slimScroll(options?: SlimScrollOptions): JQuery;
}
