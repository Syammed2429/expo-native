package expo.modules.radialchart

import android.content.Context
import android.graphics.Color
import androidx.annotation.ColorInt
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry
import com.github.mikephil.charting.highlight.Highlight
import com.github.mikephil.charting.listener.OnChartValueSelectedListener
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.views.ExpoView


class Series : Record {
  @Field
  val color: String = "#ff0000"

  @Field
  val percentage: Float = 0.0f
}

class ExpoRadialChartView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private var seriesData: ArrayList<Series> = ArrayList()
  
  internal val chartView = PieChart(context).also {
    it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    
    // Configure chart appearance
    it.description.isEnabled = false
    it.isDrawHoleEnabled = true
    it.setHoleColor(Color.TRANSPARENT)
    it.holeRadius = 40f
    it.transparentCircleRadius = 45f
    it.setDrawCenterText(false)
    it.legend.isEnabled = false
    it.setTouchEnabled(true) // Enable touch interactions
    it.isRotationEnabled = false
    it.isHighlightPerTapEnabled = true // Enable highlighting on tap
    
    // Set up value selection listener
    it.setOnChartValueSelectedListener(object : OnChartValueSelectedListener {
      override fun onValueSelected(e: com.github.mikephil.charting.data.Entry?, h: Highlight?) {
        e?.let { entry ->
          h?.let { highlight ->
            val index = highlight.x.toInt()
            if (index < seriesData.size) {
              val series = seriesData[index]
              // Send event to React Native
              sendEvent("onSegmentSelect", mapOf(
                "index" to index,
                "percentage" to series.percentage,
                "color" to series.color
              ))
            }
          }
        }
      }
      
      override fun onNothingSelected() {
        // Optional: handle when nothing is selected
      }
    })
    
    addView(it)
  }

  fun setChartData(data: ArrayList<Series>) {
    seriesData = data // Store for event handling
    val entries: ArrayList<PieEntry> = ArrayList()
    val colors: ArrayList<Int> = ArrayList()
    for (series in data) {
      entries.add(PieEntry(series.percentage))
      colors.add(Color.parseColor(series.color))
    }
    val dataSet = PieDataSet(entries, "DataSet")
    dataSet.colors = colors
    dataSet.setDrawValues(false) // Hide percentage labels on slices
    dataSet.sliceSpace = 2f // Add space between slices
    dataSet.selectionShift = 8f // Add offset when selected for hover effect
    
    val pieData = PieData(dataSet)
    chartView.data = pieData
    chartView.invalidate()
  }
}
