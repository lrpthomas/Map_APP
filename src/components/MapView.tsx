import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import type { LatLngExpression } from 'leaflet'

interface MapPoint {
  id: string
  position: LatLngExpression
  name: string
}

function AddMarkerOnClick({ onAdd }: { onAdd: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function MapView() {
  const [markers, setMarkers] = useState<MapPoint[]>([])
  
  const addMarker = (lat: number, lng: number) => {
    const newMarker: MapPoint = {
      id: Date.now().toString(),
      position: [lat, lng],
      name: `Point ${markers.length + 1}`
    }
    setMarkers([...markers, newMarker])
  }

  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddMarkerOnClick onAdd={addMarker} />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} />
      ))}
    </MapContainer>
  )
}
