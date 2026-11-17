import './ChecklistBar.css'

const ITEMS = ['High Protein', 'Low Calories', 'Delicious', 'Affordable', 'Customizable', 'Balanced']

function Group({ hidden }) {
  return (
    <div className="checklist-bar__group" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span className="checklist-bar__item" key={item}>
          <i className="fas fa-check-circle" />
          {item}
        </span>
      ))}
    </div>
  )
}

export default function ChecklistBar() {
  return (
    <section className="checklist-bar">
      <div className="checklist-bar__track">
        <Group />
        {/* Duplicate set: only shown on mobile to make the marquee loop seamless */}
        <Group hidden />
      </div>
    </section>
  )
}
