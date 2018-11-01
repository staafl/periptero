import { StyleSheet } from 'react-native';

// ========================================

const rawStyles = {
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 15,
    alignSelf: 'center',
    margin: 5,
    width: 75,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#003434',
    alignItems: 'stretch'
  },
  inputSize: {
    height: 40,
  },
  inputLayout: {
    paddingLeft: 15,
    marginLeft: 15,
    marginRight: 15
  },
  inputCore: {
    color: 'white',
  },
  inputBigSize: {
    height: 60,
  },
  inputBig: {
    inherit: ['inputCore', 'inputBigSize']
  },
  border: {
    borderColor: 'white',
    borderWidth: 0.2,
  },
  inputLikeView: {
    inherit: ['border', 'inputSize', 'inputLayout'],
  },
  input: {
    inherit: ['border', 'inputCore', 'inputSize', 'inputLayout'],
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  label: {
    inherit: ['text'],
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 25
  },
  item: {
    padding: 16,
    flex: 1,
  },
  button: {
  },
  bigButton: {
    //inherit: ['border'],
  },
  buttonText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 35,
    color: 'white',
  },
  itemView: {
    inherit: ['inputBigSize'],
    flexDirection: 'row',
    alignItems: 'stretch',
  },
};

while (true) {
    let stateChanged = false;
    let anySkipped = false;
    for (const key of Object.keys(rawStyles)) {
        const thisRawStyle = rawStyles[key];
        if (thisRawStyle.inherit) {
            let ii = -1;
            let anySkippedHere = false;
            for (const inherit of (typeof thisRawStyle.inherit === "string" ? [thisRawStyle.inherit] : thisRawStyle.inherit)) {
                ii += 1;
                if (!inherit) {
                    continue;
                }
                const parentRawStyle = rawStyles[inherit];
                if (parentRawStyle.inherit) {
                    anySkippedHere = true;
                    anySkipped = true;
                    continue;
                }
                Object.assign(thisRawStyle, Object.assign(Object.assign({}, parentRawStyle), thisRawStyle));
                stateChanged = true;
                if (typeof thisRawStyle.inherit !== "string") {
                    delete thisRawStyle.inherit[ii];
                }
            }
            if (!anySkippedHere) {
                delete thisRawStyle.inherit;
            }
        }
    }
    if (!stateChanged) {
        if (anySkipped) {
            throw new Error("Circular inheritance detected");
        }
        break;
    }
}
export const Styles = StyleSheet.create(rawStyles);
Styles.navigation = {
    headerStyle: {
      backgroundColor: '#757575',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
};