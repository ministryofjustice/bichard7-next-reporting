module.exports = {
  target: (pkg) => {
    if (
      ["eslint", "@typescript-eslint/eslint-plugin", "@typescript-eslint/parser", "eslint-plugin-jest"].includes(pkg)
    ) {
      console.log(` ${pkg} is pinned to minor upgrades only (.ncurc.js)`)
      return "minor"
    }

    if ([].includes(pkg)) {
      console.log(` ${pkg} is pinned to patch upgrades only (.ncurc.js)`)
      return "patch"
    }

    return "latest"
  },

  filterResults: (pkg, { upgradedVersion }) => {
    if ([].some((ignore) => ignore.pkg === pkg)) {
      return false
    }
    if ([].some((skip) => skip.pkg === pkg && skip.version === upgradedVersion)) {
      return false
    }
    return true
  }
}
