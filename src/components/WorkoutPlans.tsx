export default function WorkoutPlans() {
  return (
    <section className="workout-plans" id="workout-plans">
      <div className="wp-inner">
        <div className="section-label">Training</div>
        <h2 className="section-title">Workout Plans</h2>
        <div className="wp-grid">
          <div className="wp-card">
            <h3>Strength Builder</h3>
            <div className="wp-days">3 Days / Week</div>
            <p>
              Focused compound lifts to build raw strength and power.
              Squat, bench, deadlift — the essentials.
            </p>
          </div>
          <div className="wp-card">
            <h3>Fat Burner</h3>
            <div className="wp-days">5 Days / Week</div>
            <p>
              High-intensity circuits and conditioning work designed to
              maximise caloric burn and improve endurance.
            </p>
          </div>
          <div className="wp-card">
            <h3>Body Composition</h3>
            <div className="wp-days">4 Days / Week</div>
            <p>
              Balanced hypertrophy programme combining resistance training
              with targeted cardio for lean muscle growth.
            </p>
          </div>
        </div>
        <div className="wp-placeholder">
          <p>Detailed workout schedules coming soon</p>
          <div className="coming-soon">Updated Plans Loading...</div>
        </div>
      </div>
    </section>
  );
}
