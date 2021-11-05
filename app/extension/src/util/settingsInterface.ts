// shape of the extension settings
export interface Settings {
  enabled: boolean;
  rules: rule[];
}

export type rule = string;
