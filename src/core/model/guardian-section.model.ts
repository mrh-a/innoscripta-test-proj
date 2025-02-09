export interface IGuardianSectionResponse {
  response: {
    status: "ok";
    userTier: string;
    total: number;
    results: [];
  };
}

export interface IGuardianSection {
  id: string;
  webTitle: string;
}
