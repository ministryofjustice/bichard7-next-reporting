const minor = ["typescript", "eslint"]

module.exports = {
  target: (pkg) => {
    if (minor.some((pin) => pin === pkg)) {
      const res = "minor"
      console.log(` ${pkg} is pinned to ${res} upgrades only (.ncurc.js)`)
      return res
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
