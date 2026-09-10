import QRCode from 'qrcode';

export async function generateQrDataUrl(
  text: string, 
  options: {
    darkColor?: string;
    lightColor?: string;
    width?: number;
    margin?: number;
  } = {}
): Promise<string> {
  try {
    const url = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: options.margin ?? 1,
      width: options.width ?? 280,
      color: {
        dark: options.darkColor || '#0a192f',
        light: options.lightColor || '#ffffff'
      }
    });
    return url;
  } catch (err) {
    console.error('Failed to generate QR DataURL:', err);
    return '';
  }
}

export async function generateQrSvgString(
  text: string,
  options: {
    darkColor?: string;
    lightColor?: string;
    width?: number;
  } = {}
): Promise<string> {
  try {
    const svgString = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 1,
      width: options.width ?? 300,
      color: {
        dark: options.darkColor || '#0a192f',
        light: options.lightColor || '#ffffff'
      }
    });
    return svgString;
  } catch (err) {
    console.error('Failed to generate QR SVG:', err);
    return '';
  }
}
