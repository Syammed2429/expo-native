import ExpoModulesCore
import DGCharts

struct Series: Record {
  @Field
  var color: UIColor = UIColor.black

  @Field
  var percentage: Double = 0
}

class ExpoRadialChartView: ExpoView {
  let chartView = PieChartView()
  private var seriesData: [Series] = []
  
  // Event dispatcher for segment selection
  let onSegmentSelect = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    
    // Configure chart appearance
    chartView.legend.enabled = false
    chartView.chartDescription.enabled = false
    chartView.holeRadiusPercent = 0.4
    chartView.transparentCircleRadiusPercent = 0.45
    chartView.drawHoleEnabled = true
    chartView.holeColor = UIColor.clear
    chartView.isUserInteractionEnabled = true // Enable user interaction
    chartView.rotationEnabled = false
    chartView.highlightPerTapEnabled = true // Enable highlighting on tap
    
    // Set up delegate for handling selections
    chartView.delegate = self
    
    addSubview(chartView)
  }

  override func layoutSubviews() {
    chartView.frame = bounds
  }

  func setChartData(data: [Series]) {
    seriesData = data // Store for event handling
    let set1 = PieChartDataSet(entries: data.map({ (series: Series) -> PieChartDataEntry in
      return PieChartDataEntry(value: series.percentage)
    }))
    set1.colors = data.map({ (series: Series) -> UIColor in
      return series.color
    })
    set1.drawValuesEnabled = false // Hide percentage labels on slices
    set1.sliceSpace = 2.0 // Add space between slices
    set1.selectionShift = 8.0 // Add offset when selected for hover effect
    
    let chartData: PieChartData = [set1]
    chartView.data = chartData
  }
}

// MARK: - ChartViewDelegate
extension ExpoRadialChartView: ChartViewDelegate {
  func chartValueSelected(_ chartView: ChartViewBase, entry: ChartDataEntry, highlight: Highlight) {
    let index = Int(highlight.x)
    if index < seriesData.count {
      let series = seriesData[index]
      // Convert UIColor back to hex string
      var red: CGFloat = 0
      var green: CGFloat = 0
      var blue: CGFloat = 0
      var alpha: CGFloat = 0
      series.color.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
      let hexColor = String(format: "#%02X%02X%02X", 
                           Int(red * 255), 
                           Int(green * 255), 
                           Int(blue * 255))
      
      // Send event to React Native using EventDispatcher
      onSegmentSelect([
        "index": index,
        "percentage": series.percentage,
        "color": hexColor
      ])
    }
  }
  
  func chartValueNothingSelected(_ chartView: ChartViewBase) {
    // Optional: handle when nothing is selected
  }
}
