declare module "chainify-url" {
  interface ChainEnders {
    [key: string]: (url: URL) => any;
  }

  export default function chainify(baseURL: string | URL, enders: ChainEnders): any;
}
