declare function plugin(
  options?: Partial<{ className: string; target: 'modern' | 'legacy'; skip: Array<string> }>
): {
  handler: () => void
}

declare namespace plugin {
  const __isOptionsFunction: true
}

export = plugin
