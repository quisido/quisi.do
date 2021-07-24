export default function externalRedirect(href: string): () => undefined {
  return (): undefined => {
    window.location.href = href;
    return;
  };
}
