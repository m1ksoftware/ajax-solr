require 'rake'
require 'yui/compressor'

desc 'Aggregate all javascript files'
task :aggregate, :compress do |t, args|
  args.with_defaults(:compress => false)
  output_file = ENV.include?('output') ? ENV['output'] : 'ajax-solr.min.js'

  core = [
    'Core',
    'AbstractManager',
    'ParameterStore',
    'AbstractWidget',
    'AbstractFacetWidget'
  ]

  dirs = [
    'core',
    'helpers',
    'managers',
    'widgets'
  ]

  compressor = YUI::JavaScriptCompressor.new(:munge => true) if args[:compress]

  files = core.map{ |name| "core/#{name}.js" } + dirs.map{ |dir| Dir["#{dir}/**/*.js"] }.flatten
  files.uniq!

  File.open(output_file, 'w') do |output|
    files.each do |file_name|
      puts "Aggregating #{file_name}"
      input = File.open(file_name, 'r') { |f| f.read }

      if args[:compress]
        output.write compressor.compress(input)
      else
        output.write input
      end
    end
  end
end

desc 'Compress all javascript files'
task :compress do
  Rake::Task[:aggregate].invoke(true)
end
