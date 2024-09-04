enum ImageType {
  imgMain = 'imgmain',
  imgSecondary = 'imgsecondary',
};

enum ImageSize {
  imgLarge = 'large',
  imgMedium = 'medium',
  imgSmall = 'small',
}

type ProductImg = {
  imgLarge: string;
  imgMedium: string;
  imgSmall: string;
  imgAlt: string;
}

type ProductCharacteristic = {
  key: string;
  value: string;
}

export type ProductPropertiesDto = {
  productProperties: {
    asin: string;
    title: string;
    description: string;
    pubDate: string;
    amazon: {
      realUrl: string;
      affiliateUrl: string;
      rating: number;
      price: number;
    },
    robots: string;
    nextButtonImg: string;
    nextButtonImgAlt: string;
    prevButtonImg: string;
    prevButtonImgAlt: string;
    starImg: string;
    starAlt: string;
    imgHtmlSizes: string;
    basePathProductImg: string;
    figCaption: string;
    productImgList: ProductImg[];
    productInformationList: ProductCharacteristic[]
  }
}

export type ProductListDto = {
  productList: ProductPropertiesDto[];
}