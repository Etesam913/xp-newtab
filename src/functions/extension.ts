// Extension origins do not supply an HTTP Referer to YouTube automatically.
// Identify this app using YouTube's documented store-app identifier format.
export function createYouTubeReferrerRule(
  extensionHostname: string,
  appId: string,
): chrome.declarativeNetRequest.Rule {
  return {
    id: 1,
    priority: 1,
    action: {
      type: "modifyHeaders" as chrome.declarativeNetRequest.RuleActionType,
      requestHeaders: [
        {
          header: "Referer",
          operation: "set" as chrome.declarativeNetRequest.HeaderOperation,
          value: `https://xp-newtab.${appId.replace(/[{}]/g, "").toLowerCase()}/`,
        },
      ],
    },
    condition: {
      regexFilter: "^https://www\\.youtube\\.com/embed/[a-zA-Z0-9_-]{11}",
      initiatorDomains: [extensionHostname],
      resourceTypes: ["sub_frame" as chrome.declarativeNetRequest.ResourceType],
    },
  };
}
export async function configureYouTubeEmbeds(): Promise<void> {
  if (!["chrome-extension:", "moz-extension:"].includes(location.protocol))
    return;
  const extension =
    (globalThis as typeof globalThis & { browser?: typeof chrome }).browser ??
    globalThis.chrome;
  if (!extension?.declarativeNetRequest) return;
  const rule = createYouTubeReferrerRule(
    new URL(extension.runtime.getURL("/")).hostname,
    extension.runtime.id,
  );
  await extension.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [rule.id],
    addRules: [rule],
  });
}
