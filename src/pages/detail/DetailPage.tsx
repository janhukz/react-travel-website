import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  touristRouterId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  return <div>{props.match.params.touristRouterId}</div>
}
