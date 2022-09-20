import React from "react"

import styles from "./Alert.module.css"

export function Alert({ children }): JSX.Element {
  return <div className={styles.Alert}>{children}</div>
}
