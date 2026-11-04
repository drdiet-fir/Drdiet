import './ChecklistBar.css'

const ITEMS = ['High Protein', 'Low Calories', 'Delicious', 'Affordable', 'Customizable', 'Balanced']

export default function ChecklistBar() {
  return (
    <section className="checklist-bar">
      <div className="container checklist-bar__inner">
        {ITEMS.map((item) => (
          <span className="checklist-bar__item" key={item}>
            <i className="fas fa-check-circle" />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
